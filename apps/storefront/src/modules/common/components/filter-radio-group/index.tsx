import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@modules/common/components/ui"
type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: string
  handleChange: (value: string) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-x-3 flex-col gap-y-3">
      <Text className="txt-compact-small-plus text-[#666666] font-semibold uppercase tracking-wide text-xs">{title}</Text>
      <RadioGroup data-testid={dataTestId}>
        {items?.map((i, index) => (
          <div
            key={i.value}
            className={clx("flex gap-x-3 items-center py-2 px-3 rounded-xl transition-all duration-200", {
              "bg-[#8B4513]/10 ml-[-12px] mr-[-12px] pl-[12px] pr-[12px]": i.value === value,
              "hover:bg-[#FAF8F2]": i.value !== value,
            })}
          >
            <div
              className={clx(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                i.value === value
                  ? "border-[#8B4513] bg-[#8B4513]"
                  : "border-[#D4A574] bg-white"
              )}
            >
              {i.value === value && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <RadioGroup.Item
              checked={i.value === value}
              onChange={() => handleChange(i.value)}
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                "!txt-compact-small !transform-none cursor-pointer transition-colors duration-200 flex-1",
                i.value === value ? "text-[#8B4513] font-semibold" : "text-[#666666] hover:text-[#2B2B2B]"
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup

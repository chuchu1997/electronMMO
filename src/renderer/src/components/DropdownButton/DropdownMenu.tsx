export interface DropdownMenuProps {
  items: { label: string; onClick: () => void }[]
  closeDropdown?: () => void // Nhận closeDropdown để đóng menu khi cần
}
export const DropdownMenu = ({ items, closeDropdown }: DropdownMenuProps) => {
  return (
    <ul className=" bg-base-100 w-full max-h-[180px] overflow-y-auto">
      {items.map((item, index) => (
        <li key={index}>
          <button
            onClick={() => {
              item.onClick()
              if (closeDropdown) {
                closeDropdown()
              }
              //   closeDropdown()
            }}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  )
}

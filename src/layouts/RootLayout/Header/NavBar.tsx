import styled from "@emotion/styled"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import {
  ArchiveBoxXMarkIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
} from "@heroicons/react/16/solid"
import { Condition } from "src/components/Condition"
import { useAuthHandler } from "src/libs/auth"

type NavBarProps = {
  onLoginClick?: () => void
}

const NavBar: React.FC<NavBarProps> = ({ onLoginClick }) => {
  const { user, isLoggedIn, handleLogout } = useAuthHandler()

  return (
    <StyledWrapper className="">
      <ul>
        {isLoggedIn ? (
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-slate-800 dark:text-white focus:outline-none data-[hover]:bg-gray-200 dark:data-[hover]:bg-neutral-700 data-[focus]:outline-1 data-[focus]:outline-white dark:data-[focus]:outline-gray-800">
              {user?.name}
              <ChevronDownIcon className="size-4 fill-slate-800 dark:fill-white" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="!top-[52px] w-44 flex flex-col origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 bg-gray-500 dark:bg-neutral-800 overflow-x-hidden"
            >
              <MenuItem>
                <button className="px-3 group flex items-center gap-2 rounded-lg py-1.5 data-[focus]:bg-white/10">
                  <PencilIcon className="size-4 fill-white/30" />
                  Edit
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className="px-3 group flex items-center gap-2 rounded-lg py-1.5 data-[focus]:bg-white/10"
                  onClick={handleLogout}
                >
                  <ArrowRightStartOnRectangleIcon className="size-4 fill-white/30" />
                  Logout
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        ) : (
          <li
            onClick={onLoginClick}
            className="cursor-pointer hover:text-blue-500"
          >
            {isLoggedIn ? user?.name : "Login"}
          </li>
        )}
      </ul>
    </StyledWrapper>
  )
}

export default NavBar

const StyledWrapper = styled.div`
  flex-shrink: 0;
  ul {
    display: flex;
    flex-direction: row;
    li {
      display: block;
      margin-left: 1rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
  }
`

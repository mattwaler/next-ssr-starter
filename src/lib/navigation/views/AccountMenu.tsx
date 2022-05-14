import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { usePageContext } from 'components/Page'
import { useRouter } from 'next/router'
import { LogoutIcon, IdentificationIcon } from '@heroicons/react/outline'

interface MenuItemProps {
  link: string
  text: string
  icon: React.ReactNode
}

function MenuItem(props: MenuItemProps) {
  const router = useRouter()
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          onClick={() => router.push(props.link)}
          className={`${
            active ? 'bg-gray-500 text-white' : 'text-gray-900'
          } group flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm`}
        >
          <span className="h-5 w-5 text-gray-500 group-hover:text-gray-100">
            {props.icon}
          </span>
          {props.text}
        </button>
      )}
    </Menu.Item>
  )
}

export default function AccountMenu() {
  const { user } = usePageContext()
  if (!user) return null

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex w-full items-center justify-center gap-2 text-sm font-medium">
        <span>{user.name}</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <MenuItem
              link="/account"
              text="Account"
              icon={<IdentificationIcon />}
            />
          </div>
          <div className="px-1 py-1">
            <MenuItem
              link="/api/user/logout"
              text="Logout"
              icon={<LogoutIcon />}
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

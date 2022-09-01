import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsChevronDown as ChevronDownIcon } from 'react-icons/bs';
import combineClasses from '../../utils/combineClasses';

interface QuantitySelectProps {
  selectedQuantity: number;
  handleSelect: (qty: number) => void;
}

const QuantitySelect = (props: QuantitySelectProps) => {
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function onSelectQuantity(quantity: number) {
    props.handleSelect(quantity);
  }

  return (
    <Menu as="div" className="relative inline-block text-left mr-2">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {props.selectedQuantity}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute left-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {quantities.map((availableQuantity) => {
              return (
                <Menu.Item key={availableQuantity}>
                  {
                    <button
                      type="button"
                      onClick={() => props.handleSelect(availableQuantity)}
                      disabled={availableQuantity === props.selectedQuantity}
                      className={combineClasses(
                        availableQuantity === props.selectedQuantity ? 'bg-gray-100' : 'text-gray-800',
                        `w-full block p-2 text-sm hover:bg-gray-100 focus:bg-gray-100`
                      )}>
                      {availableQuantity}
                    </button>
                  }
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default QuantitySelect;

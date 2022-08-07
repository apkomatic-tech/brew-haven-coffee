import Link from 'next/link';

interface AccountNavProps {
  activeTab: string;
}
const AccountNav = ({ activeTab }: AccountNavProps) => {
  return (
    <div className="mb-10 flex border-b-2 border-slate-200">
      <Link href="/account/settings" passHref>
        <a
          className={`py-4 px-1 border-b-2 mr-6 block hover:text-primary hover:border-primary translate-y-[2px] ${
            activeTab === 'settings' ? 'text-primary border-primary' : 'text-black border-transparent'
          }`}>
          Account Settings
        </a>
      </Link>
      <Link href="/account/order-history" passHref>
        <a
          className={`py-4 px-1 border-b-2 block hover:text-primary hover:border-primary translate-y-[2px] ${
            activeTab === 'order-history' ? 'text-primary border-primary' : 'text-black border-transparent'
          }`}>
          Order History
        </a>
      </Link>
    </div>
  );
};

export default AccountNav;

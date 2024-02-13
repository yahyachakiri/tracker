import { motion, AnimatePresence } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

interface props {
    top?: boolean;
}

const Account = ({ top }: props) => {
    const { data: session } = useSession();
    const query = useRouter();
    const active = query.route == '/account';
    const [account, setAccount] = useState(false);

    const closeDropdown = () => {
        setAccount(false);
    };
    const ref = useDetectClickOutside({ onTriggered: closeDropdown });
    return (
        <>
            <div className="relative" onClick={() => setAccount(true)} ref={ref}>
                <img
                    src={session?.user?.image || ''}
                    alt=""
                    className={`${
                        top ? 'w-9 h-9 outline-2 outline-offset-4' : 'w-[30px] h-[30px] outline-1 outline-offset-2'
                    } bg-black rounded-full cursor-pointer outline transtion  ${
                        account || active ? 'outline-white' : 'outline-transparent hover:outline-second'
                    }`}
                />
                <AnimatePresence>
                    {account && (
                        <motion.div
                            initial={{ opacity: 0, ...(top ? { y: '7px' } : { y: '-7px' }) }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, ...(top ? { y: '7px' } : { y: '-7px' }) }}
                            transition={{ duration: 0.2 }}
                            className={`bg-account text-center absolute overflow-hidden ${
                                top ? 'top-14' : 'bottom-11'
                            } -right-1 text-xs z-10 rounded-lg`}
                        >
                            {/* <p className="py-4 px-6 hover:bg-second cursor-pointer">Settings</p> */}
                            <button onClick={() => signOut()} className="py-4 px-6 hover:bg-second cursor-pointer">
                                Logout
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Account;

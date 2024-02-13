import { Card } from '@ui/index';

interface props {
    time: 'range' | 'specific' | 'short';
    className?: string;
    linkState?: boolean;
}

const Emails = ({ time, className, linkState }: props) => {
    return (
        <Card
            header="Recent emails"
            linkState={linkState}
            link="/emails"
            time={time}
            loading={false}
            updateState={() => {}}
            updateLoading={() => {}}
            className={className}
        >
            <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center justify-center sm:justify-between text-sm gap-2">
                    <div className="flex items-center gap-3 sm:w-40">
                        <img src="" alt="" className="w-[30px] h-[30px] bg-white rounded-full" />
                        <p>Lorem Ipsum</p>
                    </div>
                    <p className="font-semibold sm:w-40 truncate">Lorem, ipsum dolor</p>
                    <p className="truncate sm:w-60">Lorem ipsum dolor sit amet.</p>
                    <p>10:37 AM</p>
                </div>
            </div>
        </Card>
    );
};

export default Emails;

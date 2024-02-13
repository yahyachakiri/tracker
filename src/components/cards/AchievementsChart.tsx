import { Card, LineChart } from '@ui/index';

interface props {
    time: 'range' | 'specific' | 'short';
    className?: string;
    linkState?: boolean;
}

const AchievementsChart = ({ time, className, linkState }: props) => {
    return (
        <Card
            header="Achievements tracking"
            linkState={linkState}
            link="/achievements"
            time={time}
            loading={false}
            updateState={() => {}}
            updateLoading={() => {}}
            className={`achievement ${className ? className : ''}`}
        >
            <div className="relative">
                <div className="mr-12">
                    <LineChart high={true} data={[]} />
                </div>
                <div className="absolute w-11 h-full top-0 right-0 text-[10px] text-character flex flex-col justify-between">
                    <span>4</span>
                    <span>0</span>
                </div>
            </div>
        </Card>
    );
};

export default AchievementsChart;

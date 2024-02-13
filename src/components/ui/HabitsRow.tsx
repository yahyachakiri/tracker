import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { IPage } from '@interfaces/index';
import { WeightInputHandler, WorkInputHandler, caloriesCalculator, minutesToHours, workInputsValues } from '@utils/index';

interface props {
    habits: IPage;
    key: string;
    updateLoading: (e: boolean) => void;
    loading: boolean;
    calories: boolean;
}

const HabitsRow = ({ habits, updateLoading, loading, calories }: props) => {
    const [fajr, setFajr] = useState(habits.properties.Fajr.checkbox);
    const [quran, setQuran] = useState(habits.properties.Quran.checkbox);
    const [exercise, setExercise] = useState(habits.properties.Exercise.checkbox);
    const [macros, setMacros] = useState(habits.properties.Macros.checkbox);

    const [minutes, setMinutes] = useState<string>(workInputsValues(minutesToHours(habits.properties.Work.number).minutes));
    const [hours, setHours] = useState<string>(workInputsValues(minutesToHours(habits.properties.Work.number).hours));
    const [weight, setWeight] = useState(String(habits.properties.Weight.number));
    const [cals, setCals] = useState(habits.properties.Calories.formula.number);

    const [sendMinutes, setSendMinutes] = useState(minutes);
    const [sendHours, setSendHours] = useState(hours);
    const [sendWeight, setSendWeight] = useState(weight);

    useEffect(() => {
        setCals(caloriesCalculator(sendWeight, habits.properties.Date.date.start));
    }, [sendWeight]);

    const updateWeight = async (weight: string) => {
        updateLoading(true);
        const link = `/api/habits/edit?id=${habits.id}&weight=${weight}`;
        await axios
            .patch(link)
            .then(() => updateLoading(false))
            .catch((err) => {
                console.log(err);
                updateLoading(false);
            });
    };
    const updateWork = async (min: string, h: string) => {
        updateLoading(true);
        let result = null;
        let minutes: number | null = parseInt(min);
        if (Number.isNaN(minutes)) minutes = null;
        let hours: number | null = parseInt(h);
        if (Number.isNaN(hours)) hours = null;
        if (minutes != null || hours != null) result = (minutes || 0) + (hours || 0) * 60;
        const link = `/api/habits/edit?id=${habits.id}&work=${result}`;
        await axios
            .patch(link)
            .then(() => updateLoading(false))
            .catch((err) => {
                console.log(err);
                updateLoading(false);
            });
    };

    const changeCheckHandler = async (state: boolean, setState: Dispatch<SetStateAction<boolean>>, type: string) => {
        updateLoading(true);
        setState(!state);
        let link = `/api/habits/edit?id=${habits.id}&${type}=${state ? '0' : '1'}`;
        await axios
            .patch(link)
            .then(() => updateLoading(false))
            .catch((err) => console.log(err));
    };
    return (
        <form title={habits.properties.Date.date.start} className="flex justify-center gap-4 sm:gap-8 flex-wrap">
            <div className="flex items-center justify-center mt-4">
                <input
                    min="0"
                    max="12"
                    type="text"
                    placeholder="0"
                    value={hours}
                    onBlur={(e) => WorkInputHandler(e, setHours, sendHours, setSendHours, sendMinutes, updateWork, 'hours')}
                    onChange={(e) => setHours(e.target.value)}
                    disabled={loading}
                    className="input disabled:bg-transparent disabled:shadow-none disabled:border-transparent input-ghost text-right w-4 h-8 sm:w-8 text-lg sm:text-2xl p-0 font-medium z-10"
                />
                <p className="relative mt-1 ml-1 text-xs sm:text-base font-medium text-character">h</p>
                <input
                    min="0"
                    max="59"
                    type="text"
                    placeholder="00"
                    value={minutes}
                    onBlur={(e) => WorkInputHandler(e, setMinutes, sendMinutes, setSendMinutes, sendHours, updateWork, 'minutes')}
                    onChange={(e) => setMinutes(e.target.value)}
                    disabled={loading}
                    className="input disabled:bg-transparent disabled:shadow-none disabled:border-transparent input-ghost text-right w-7 h-8 sm:w-8 text-lg sm:text-2xl p-0 font-medium ml-1 z-10"
                />
                <p className="relative mt-1 ml-1 text-xs sm:text-base font-medium text-character">min</p>
            </div>
            <div className="w-4 sm:w-5 flex items-end">
                <input
                    checked={fajr}
                    onChange={() => changeCheckHandler(fajr, setFajr, 'fajr')}
                    type="checkbox"
                    disabled={loading}
                    className="checkbox checkbox-success checkbox-xs sm:checkbox-sm rounded-md sm:border-2"
                />
            </div>
            <div className="w-4 sm:w-5 flex items-end">
                <input
                    checked={quran}
                    onChange={() => changeCheckHandler(quran, setQuran, 'quran')}
                    type="checkbox"
                    disabled={loading}
                    className="checkbox checkbox-success checkbox-xs sm:checkbox-sm rounded-md sm:border-2"
                />
            </div>
            <div className="w-4 sm:w-5 flex items-end">
                <input
                    checked={exercise}
                    onChange={() => changeCheckHandler(exercise, setExercise, 'exercise')}
                    type="checkbox"
                    disabled={loading}
                    className="checkbox checkbox-success checkbox-xs sm:checkbox-sm rounded-md sm:border-2"
                />
            </div>
            <div className="w-4 sm:w-5 flex items-end">
                <input
                    checked={macros}
                    onChange={() => changeCheckHandler(macros, setMacros, 'macros')}
                    type="checkbox"
                    disabled={loading}
                    className="checkbox checkbox-success checkbox-xs sm:checkbox-sm rounded-md sm:border-2"
                />
            </div>
            <div className="w-[45px] flex items-end justify-center">
                {calories ? (
                    <p className="text-lg font-medium relative -mb-1">{cals}</p>
                ) : (
                    <input
                        min="0"
                        max="12"
                        type="text"
                        placeholder="00"
                        onChange={(e) => setWeight(e.target.value)}
                        onBlur={(e) => WeightInputHandler(e, setWeight, sendWeight, setSendWeight, updateWeight)}
                        value={weight}
                        disabled={loading}
                        className="input disabled:bg-transparent disabled:shadow-none disabled:border-transparent input-ghost text-right w-4 h-8 sm:w-8 text-lg sm:text-2xl p-0 font-medium z-10 relative -mb-0.5"
                    />
                )}
            </div>
        </form>
    );
};
export default HabitsRow;

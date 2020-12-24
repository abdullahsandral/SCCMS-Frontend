import React, { useEffect } from 'react';

import {useForm} from '../../../Shared/Hooks/Form-Hook';
import classes from './OD_TT.module.css';

const OD_TT = props =>
{
    const {fState,classSubjects} = props;

    const dayName = props.oneDayData.Day_Name;

    const [formState , inputChangeHandler] = useForm({
        L1 : {
            inputValue : props.oneDayData.Lec_1,
            inputisValid : props.oneDayData.Lec_1.trim().length!==0
        },
        L2 : {
            inputValue : props.oneDayData.Lec_2,
            inputisValid : props.oneDayData.Lec_2.trim().length!==0
        },
        L3 : {
            inputValue : props.oneDayData.Lec_3,
            inputisValid : props.oneDayData.Lec_3.trim().length!==0
        },
        L4 : {
            inputValue : props.oneDayData.Lec_4,
            inputisValid : props.oneDayData.Lec_4.trim().length!==0
        },
        L5 : {
            inputValue : props.oneDayData.Lec_5,
            inputisValid : props.oneDayData.Lec_5.trim().length!==0
        },
        L6 : {
            inputValue : props.oneDayData.Lec_6,
            inputisValid : props.oneDayData.Lec_6.trim().length!==0
        },
        L7 : {
            inputValue : props.oneDayData.Lec_7,
            inputisValid : props.oneDayData.Lec_7.trim().length!==0
        },
    } ,props.oneDayData.Lec_1.trim().length!==0 && props.oneDayData.Lec_2.trim().length!==0 && props.oneDayData.Lec_3.trim().length!==0 && props.oneDayData.Lec_4.trim().length!==0 && props.oneDayData.Lec_5.trim().length!==0 && props.oneDayData.Lec_6.trim().length!==0 && props.oneDayData.Lec_7.trim().length!==0)

    useEffect(() => { fState(formState,dayName);},[formState,fState,dayName])

    const {L1,L2,L3,L4,L5,L6,L7} = formState.inputs;
    useEffect(()=> 
    {   inputChangeHandler('L1',L1.inputValue,!!L1.inputValue);
        inputChangeHandler('L2',L2.inputValue,!!L2.inputValue);
        inputChangeHandler('L3',L3.inputValue,!!L3.inputValue);
        inputChangeHandler('L4',L4.inputValue,!!L4.inputValue);
        inputChangeHandler('L5',L5.inputValue,!!L5.inputValue);
        inputChangeHandler('L6',L6.inputValue,!!L6.inputValue);
        inputChangeHandler('L7',L7.inputValue,!!L7.inputValue);},
    [L1.inputValue,L2.inputValue,L3.inputValue,L4.inputValue,L5.inputValue,L6.inputValue,L7.inputValue,inputChangeHandler]
    )


    return <>
    
        <form className={classes.OD_TT} onSubmit={e =>{ e.preventDefault(); console.log(formState);}}>
            <h5>{dayName}</h5>
            
            <select value={formState.inputs.L1.inputValue}
                onChange={e => inputChangeHandler('L1',e.target.value,!!e.target.value)}>
                <option value=''>Select A Subject</option>
                <option value='BREAK'>BREAK</option>
                {classSubjects.map( s => 
                <option key={s.Subject_Name} value={s.Subject_Name}>{s.Subject_Name}</option>)}
            </select>

            <select value={formState.inputs.L2.inputValue}
                onChange={e => inputChangeHandler('L2',e.target.value,!!e.target.value)}>
                <option value=''>Select A Subject</option>
                <option value='BREAK'>BREAK</option>
                {classSubjects.map( s => 
                <option key={s.Subject_Name} value={s.Subject_Name}>{s.Subject_Name}</option>)}
            </select>

            <select value={formState.inputs.L3.inputValue}
                onChange={e => inputChangeHandler('L3',e.target.value,!!e.target.value)}>
                <option value=''>Select A Subject</option>
                <option value='BREAK'>BREAK</option>
                {classSubjects.map( s => 
                <option key={s.Subject_Name} value={s.Subject_Name}>{s.Subject_Name}</option>)}
            </select>

            <select value={formState.inputs.L4.inputValue}
                onChange={e => inputChangeHandler('L4',e.target.value,!!e.target.value)}>
                <option value=''>Select A Subject</option>
                <option value='BREAK'>BREAK</option>
                {classSubjects.map( s => 
                <option key={s.Subject_Name} value={s.Subject_Name}>{s.Subject_Name}</option>)}
            </select>

            <select value={formState.inputs.L5.inputValue}
                onChange={e => inputChangeHandler('L5',e.target.value,!!e.target.value)}>
                <option value=''>Select A Subject</option>
                <option value='BREAK'>BREAK</option>
                {classSubjects.map( s => 
                <option key={s.Subject_Name} value={s.Subject_Name}>{s.Subject_Name}</option>)}
            </select>

            <select value={formState.inputs.L6.inputValue}
                onChange={e => inputChangeHandler('L6',e.target.value,!!e.target.value)}>
                <option value=''>Select A Subject</option>
                <option value='BREAK'>BREAK</option>
                {classSubjects.map( s => 
                <option key={s.Subject_Name} value={s.Subject_Name}>{s.Subject_Name}</option>)}
            </select>

            <select value={formState.inputs.L7.inputValue}
                onChange={e => inputChangeHandler('L7',e.target.value,!!e.target.value)}>
                <option value=''>Select A Subject</option>
                <option value='BREAK'>BREAK</option>
                {classSubjects.map( s => 
                <option key={s.Subject_Name} value={s.Subject_Name}>{s.Subject_Name}</option>)}
            </select>
        </form>
    </>
}

export default OD_TT;

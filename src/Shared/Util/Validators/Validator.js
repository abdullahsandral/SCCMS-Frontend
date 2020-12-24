const REQUIRE_VALIDATOR_TYPE    = "REQUIRE";
const MIN_LENGTH_VALIDATOR_TYPE = "MIN_LENGTH";
const MAX_LENGTH_VALIDATOR_TYPE = "MAX_LENGTH";
const EMAIL_VALIDATOR_TYPE      = "EMAIL";
const CNIC_VALIDATOR_TYPE      = "CNIC";
const PH_NUMBER_VALIDATOR_TYPE      = "PH_NUMBER";
// const FILE_VALIDATOR_TYPE    = "FILE";

export  const REQUIRE_VALIDATOR     = ()    =>    ({   type:   REQUIRE_VALIDATOR_TYPE  });
export  const MIN_LENGTH_VALIDATOR  = v     =>    ({   type:   MIN_LENGTH_VALIDATOR_TYPE ,  value: v});
export  const MAX_LENGTH_VALIDATOR  = v     =>    ({   type:   MAX_LENGTH_VALIDATOR_TYPE ,  value: v});
export  const EMAIL_VALIDATOR       = ()    =>    ({   type:   EMAIL_VALIDATOR_TYPE });
export  const CNIC_VALIDATOR        = ()    =>    ({   type:   CNIC_VALIDATOR_TYPE });
export  const PH_NUMBER_VALIDATOR   = ()    =>    ({   type:   PH_NUMBER_VALIDATOR_TYPE });

export const validator = (value , valiadtors) =>
{
    let isValid = true;
    if(valiadtors)
    {
        for(let oneValidator of valiadtors)
        {   
            if(oneValidator.type === REQUIRE_VALIDATOR_TYPE)
            {isValid =  isValid && value.trim().length > 0;}
            
            if(oneValidator.type === MIN_LENGTH_VALIDATOR_TYPE)
            {isValid =  isValid &&  value.trim().length >= oneValidator.value;}
            
            if(oneValidator.type === MAX_LENGTH_VALIDATOR_TYPE)
            {isValid =  isValid &&  value.trim().length <=oneValidator.value;}
            
            if(oneValidator.type === EMAIL_VALIDATOR_TYPE) 
            {isValid =  isValid && /^\S+@\S+\.\S+$/.test(value);}

            if(oneValidator.type === CNIC_VALIDATOR_TYPE) 
            {isValid =  isValid && /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/.test(value);}

            if(oneValidator.type === PH_NUMBER_VALIDATOR_TYPE) 
            {isValid =  isValid && /^03[0-9]{2}-[0-9]{7}$/.test(value);}
        }
    }
   return isValid
}
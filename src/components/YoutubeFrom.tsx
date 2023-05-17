import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

let renderCount = 0;

type FromValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facbook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const YoutubeFrom = () => {
  const form = useForm<FromValues>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: "jahid",
        email: data?.email,
        channel: "",
        social: {
          twitter: "",
          facbook: "",
        },
        phoneNumbers: ["", ""],
        phNumbers: [{ number: "" }],
        age: 0,
        dob: new Date(),
      };
    },
  });

  const { register, control, handleSubmit, formState, watch, getValues } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const onSubmit = (data: FromValues) => {
    console.log("From Submitted", data);
  };
  // const watchUsername = watch();
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);
  
  
  const handleGetValues = () =>{
    console.log("Get Values" , getValues());
    
  }
  
  
  renderCount++;



  return (
    <div>
      <h1> React Hook From {renderCount / 2} </h1>
      {/* <h1> Watched value : {watchUsername} </h1> */}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="username"> Username </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          <p className="error"> {errors.username?.message}</p>
        </div>
        <div>
          <label htmlFor="email"> Email </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid Email Formate",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email Address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "this domail is not suppoerted "
                  );
                },
              },
            })}
          />
          <p className="error"> {errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="channel"> Channel </label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p className="error"> {errors.channel?.message}</p>
        </div>
        <div>
          <label htmlFor="twitter"> Twitter </label>
          <input type="text" id="twitter" {...register("social.twitter")} />
        </div>
        <div>
          <label htmlFor="facbook"> Facebook </label>
          <input type="text" id="facbook" {...register("social.facbook")} />
        </div>
        <div>
          <label htmlFor="primary-phone"> Primary phone number </label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>
        <div>
          <label htmlFor="secondary-phone"> Secondary phone number </label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>

        <div>
          <label> List of phone Numbers </label>
          {fields.map((field, index) => {
            return (
              <div className="form-control" key={field.id}>
                <input type="text" {...register(`phNumbers.${index}.number`)} />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            );
          })}
          <button type="button" onClick={() => append({ number: "" })}>
            Add Phone Number
          </button>
        </div>

        <div>
          <label htmlFor="age"> Age </label>
          <input
            type="type"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
            })}
          />
          <p className="error"> {errors.age?.message}</p>
        </div>

        <div>
          <label htmlFor="dob"> Date of birth </label>
          <input
            type="date"
            id="age"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of birth is required",
              },
            })}
          />
          <p className="error"> {errors.dob?.message}</p>
        </div>

        <button> Submit </button>


        <button type="button" onClick={handleGetValues}> Get Values </button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
export default YoutubeFrom;

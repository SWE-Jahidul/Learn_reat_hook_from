import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FromValues = {
  username: string;
  email: string;
  channel: string;
};

const YoutubeFrom = () => {
  const form = useForm<FromValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FromValues) => {
    console.log("From Submitted", data);
  };
  renderCount++;

  return (
    <div>
      <h1> React Hook From {renderCount / 2} </h1>
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
                value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
        <button> Submit </button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
export default YoutubeFrom;

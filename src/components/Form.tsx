import { useForm, FieldValues } from "react-hook-form";
import {z} from 'zod';

const schema = z.object({
    name: z.string().min(3),
    age: z.number().min(18)
})

type FormData = z.infer<typeof schema>

const Form = () => {
    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;
    const onSubmit = (data: FieldValues) => {
        console.log(data)
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input {...register('name', {required: true, minLength: 3})} type="text" className="form-control" id='name'/>
        </div>
        {errors.name?.type === 'required' && <p>The Name Field is Required</p>}
        {errors.name?.type === 'minLength' && <p>The Name must be at least 3  characters long</p>}
        <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input {...register('age')} type="number" className="form-control" id='age'/>
        </div>
        <button className="btn btn-primary" type='submit'>Submit</button>
    </form>
  )
}

export default Form
import { isValid, z } from 'zod';
import { categories } from '../../App'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const schema = z.object({
    description: z.string().min(3, {message: 'Description should be atleast 3 characters long.'}).max(50),
    amount: z.number({invalid_type_error: 'Amount is Required!'}).min(0.01, {message: 'Enter a valid Amount'}).max(100_000),
    category: z.enum(["Groceries", "Utilities", "Entertainment"], {errorMap: () => ({message: 'Category is required!'})})
})

type ExpenseFormData = z.infer<typeof schema>

interface Props{
    onSubmit: (data: ExpenseFormData) => void
}

const ExpenseForm = ({onSubmit}: Props) => {
  const {register, handleSubmit, formState: {errors, isValid}} =  useForm<ExpenseFormData>({resolver: zodResolver(schema)})
  return (
    <form onSubmit={handleSubmit(data => onSubmit(data))}>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input  {...register('description')} type="text" className="form-control" id="description" />
            {errors.description && <p className="text-danger">{errors.description.message}</p> }
        </div>
        <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input {...register('amount', {valueAsNumber: true})} id='amount' type="number" className="form-control" />
            {errors.amount && <p className="text-danger">{errors.amount.message}</p> }
        </div>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
             <select {...register('category')} id="category" className="form-select">
                <option value="">All categories</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
             </select>
             {errors.category && <p className="text-danger">{errors.category.message}</p> }
        </div>
        <button className="btn btn-primary" disabled={!isValid}>Submit</button>
    </form>
  )
}

export default ExpenseForm
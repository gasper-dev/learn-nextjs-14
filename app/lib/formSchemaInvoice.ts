import { z } from 'zod';

const formSchemaInvoice = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer',
  }),

  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter a amount greater then $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status',
  }),
  date: z.string(),
});

export type StateInvoice = {
  errors?: {
    customerId: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateInvoice = formSchemaInvoice.omit({ id: true, date: true });
const UpdateInvoice = formSchemaInvoice.omit({ id: true, date: true });

export { CreateInvoice, UpdateInvoice };

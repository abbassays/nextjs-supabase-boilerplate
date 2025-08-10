## Form guidelines

Use React Hook Form (RHF) when there are more than two fields. Validate with Zod. Prefer the controlled wrappers in `src/components/ui/form/*`.

Helpful playground: https://www.shadcn-form.com/playground

### Larger example (RHF + Zod + Form provider + controlled inputs)

```tsx
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledSelect } from '@/components/ui/form/controlled-select';
import { ControlledPasswordInput } from '@/components/ui/form/controlled-password-input';

const userFormSchema = z.object({
  role: z.enum(['admin', 'user'], { required_error: 'Role is required' }),
});

type UserFormInput = z.infer<typeof userFormSchema>;

export default function UserForm() {
  const form = useForm<UserFormInput>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { role: 'user' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    // submit
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-4'>
        <ControlledSelect
          control={form.control}
          name='role'
          label='Role'
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
          ]}
        />
        <ControlledPasswordInput
          control={form.control}
          name='password'
          label='Password'
          placeholder='••••••••'
        />
        <Button type='submit' isLoading={form.formState.isSubmitting}>
          Save
        </Button>
      </form>
    </Form>
  );
}
```

Notes:

- Wrap forms with `<Form {...form}>` (provider) so nested components can access context.
- Use `useFormContext<FormType>()` inside child components instead of prop‑drilling the `form` object.
- Controlled wrappers handle labels, descriptions, errors, and disabled states consistently.
- For small forms (≤ 2 fields), RHF is optional.

### Using `useFormContext` in child components

```tsx
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';

type UserFormInput = { role: 'admin' | 'user'; password: string };

function SubmitActions() {
  const form = useFormContext<UserFormInput>();
  return (
    <Button type='submit' isLoading={form.formState.isSubmitting}>
      Save
    </Button>
  );
}
```

### If no controlled wrapper exists: use primitives from `src/components/ui/form.tsx`

```tsx
import { Home } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

// inside your form body
<FormField
  control={form.control}
  name='city'
  render={({ field }) => (
    <FormItem>
      <FormLabel>City</FormLabel>
      <FormControl>
        <div className='relative'>
          <Input placeholder='Enter city' className='pl-10' {...field} />
          <Home className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500' />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>;
```

import { createFormHook } from '@tanstack/react-form'
import { SelectField } from '@/shared/components/molecules/form-fields/SelectField'
import { SubmitButton } from '@/shared/components/molecules/form-fields/SubmitButton'
import { TextareaField } from '@/shared/components/molecules/form-fields/TextareaField'
import { TextField } from '@/shared/components/molecules/form-fields/TextField'
import { fieldContext, formContext } from './form-context'

/**
 * App-wide form hook (TanStack Form composition API).
 * Forms get pre-bound, design-system fields:
 *
 *   const form = useAppForm({ defaultValues, validators: { onChange: schema } })
 *   <form.AppField name="name">{(field) => <field.TextField label="Nombre" />}</form.AppField>
 */
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, TextareaField, SelectField },
  formComponents: { SubmitButton },
})

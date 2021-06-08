# 7. React Hook Form: useForm

```js
const { register } = useForm({
  mode: "onSubmit",
  reValidateMode: "onChange",
  defaultValues: {
    firstName: "bill",
    lastName: "luo",
  },
  resolver: undefined,
  context: undefined,
  criteriaMode: "firstError",
  shouldFocusError: true,
  shouldUnregister: false,
});
```

- input
  - `ref={register({})}`
  - name has to be given

## formState.isValid

`onTouched`, `onChange` `onBlur`

<script>
    import Button from "../../../shared/forms/Button.svelte";
    import Input from "../../../shared/forms/Input.svelte";
    let phone;
    let state;
    let inn;
    let document;
</script>

<Input
    name="phone"
    title="Телефон"
    info="Ваш номер телефона. Мы позвоним на него, если возникнут вопросы; также при его помощи Вы можете войти в аккаунт
     с другого устройства"
    bind:value={phone}
/>
<Input
    name="state"
    title="Юридический статус"
    values={{ ФЛ: "ФИЗЛИЦО", ИП: "ИП", ЮЛ: "ЮРЛИЦО" }}
    info="Юридический статус - ваш или компании, которую Вы представляете. Юридические лица и индивидуальные предприниматели 
    в нашем магазине получают дополнительные скидки на оптовые заказы"
    bind:value={state}
/>
<Input
    name="inn"
    title="ИНН"
    values={{ ФЛ: "ФИЗЛИЦО", ИП: "ИП", ЮЛ: "ЮРЛИЦО" }}
    info="ИНН юрлица или ИП"
    bind:value={inn}
    innSize={state == "ЮЛ" ? 10 : 12}
/>
<Input
    name="document"
    title="Документ"
    info="Скан или фотография документа, подтверждающего юридический статус. Например, свидетельства о регистрации"
    bind:value={document}
/>
{#if document}
    <img
        src={URL.createObjectURL(document)}
        alt="документ загружен"
        class="w-144 block mx-auto"
    />
{/if}

<Button>СОХРАНИТЬ</Button>

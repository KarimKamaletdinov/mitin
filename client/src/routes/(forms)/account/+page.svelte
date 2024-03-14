<script>
    import AccountButton from "../../../shared/forms/AccountButton.svelte";
    import Settings from "../settings/+page.svelte";
</script>

<AccountButton badge="3">ТЕКУЩИЕ ЗАКАЗЫ</AccountButton>
<AccountButton>ИСТОРИЯ ЗАКАЗОВ</AccountButton>
<AccountButton href="./settings">
    НАСТРОЙКИ
    <Settings slot="dialog" />
</AccountButton>
<AccountButton>ВЫЙТИ</AccountButton>
<AccountButton>СМЕНИТЬ АККАУНТ</AccountButton>

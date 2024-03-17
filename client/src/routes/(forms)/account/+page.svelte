<script>
    import AccountButton from "../../../shared/forms/AccountButton.svelte";
    import { getContext } from "svelte";
    getContext("title")?.set("Аккаунт");
</script>

<AccountButton badge="3">ТЕКУЩИЕ ЗАКАЗЫ</AccountButton>
<AccountButton>ИСТОРИЯ ЗАКАЗОВ</AccountButton>
<AccountButton href="/settings">НАСТРОЙКИ</AccountButton>
<AccountButton>ВЫЙТИ</AccountButton>
<AccountButton>СМЕНИТЬ АККАУНТ</AccountButton>

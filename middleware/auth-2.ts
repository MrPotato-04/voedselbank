export default defineNuxtRouteMiddleware(to =>{
    const auth = useCookie("Authorization-role").value;
    if (auth == "0" || auth == "2") return;
    else return navigateTo("/", { replace: true, redirectCode: 401 });
})
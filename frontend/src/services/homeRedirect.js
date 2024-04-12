import { useRouter } from 'vue-router';
import apiService from "@/services/apiService.js";

export default async function homeRedirect() {
    const router = useRouter();
    const token = localStorage.getItem('token');

    if (!token) {
        await router.push('/');
        return;
    }

    const data = await apiService.fetchJsonWithToken("/api/users/getMe", "http://localhost:5000", 'get', null);

    switch (data.id_role) {
        case 1:
            await router.push('/');
            break;
        case 2:
            await router.push('/restaurant-home?getParam=order');
            break;
        case 5:
            await router.push('/chart');
            break;
        default:
            await router.push('/');
    }
}
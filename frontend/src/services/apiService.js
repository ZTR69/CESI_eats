class ApiService {
    async fetchJson(route, base_url, verb, formData) {
        const requestOptions = {
            method: verb.toUpperCase(),
            headers: { 'Content-Type': 'application/json' },
        };
        if (formData) {
            requestOptions.body = JSON.stringify(formData);
        }
        const url = base_url + route;
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (!data.token) {
                throw new Error(`Token not found in response!`);
            }
            localStorage.setItem('token', data.token);
            alert("succès")
            return data;
        } catch (error) {
            console.error(error);
            alert("echec")
            return null;

        }
    }

    async fetchJsonWithToken(route, base_url, verb, formData) {
        const requestOptions = {
            method: verb.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        };
            if (formData) {
                requestOptions.body = JSON.stringify(formData);
            }
            const url = base_url + route;
            try {
                const response = await fetch(url, requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
                alert("echec");
                return null;
            }
        }
}

export default new ApiService();
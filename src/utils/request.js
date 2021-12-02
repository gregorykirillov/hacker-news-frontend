
export const request = async url => {
    let body, ok, status;

    try {
        const res = await fetch(url);

        ok = res.ok;
        status = res.status;

        body = await res.json();
    } catch(e) {
        return {
            error: 'Ошибка на сервере',
            ok: false,
            status: 500,
        };
    }

    return {
        data: body,
        ok,
        status,
    };
};

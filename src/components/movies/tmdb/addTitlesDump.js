import { newTitle } from "../../../helpers/moviebunkers.requests"
import { fetchTmdbTitle } from "../../../helpers/tmdb.requests";




const addTitlesDump = (titles) => {
    if ((titles?.length ?? 0) === 0) return 0;

    let count = 0;
    for (let i = 0; i < titles.length; i++) {

        fetchTmdbTitle({ id: titles[i]?.tmdb_id, titleType: titles[i]?.title_type, cancelToken: null })
            .then(res => {
                setTimeout(() => {
                    newTitle({ title: res, cancelToken: null }).then((res) => {
                        console.log(`titles added ${count + 1}`);
                    }, 5000);
                }).then(err => {
                    console.log(`failed to add title ${i}`)
                }).catch(err => {
                    console.log(err?.message)
                })
            })

    }
}

export default addTitlesDump;
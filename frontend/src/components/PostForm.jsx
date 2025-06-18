import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

function PostForm({ post, onSubmit }) {
    //inicializace react hook form 
    const {register, handleSubmit, reset, formState: { errors }} = useForm();

    useEffect(() => {
        if (post) {
            reset(post); //pro editace. Vyplne formular s data o prispevku
        } else {
            reset({ title: '', body: '' }); //Pro novy prispevek. Vytvori cisty formular
        }
    }, [post, reset]);

    return (
        // 
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 md:w-xl w-xs max-w-xl mx-auto"
        >
            {/* kdyz post existuje -> editace prispeku. Jinak -> novy prispevek */}
            <h2 className="text-2xl font-bold text-neutral-600 text-center">
                {post ? 'Editace příspěvku' : 'Nový příspěvek'}
            </h2>

            <div>
                <label className="text-md font-medium text-zink-700 mb-1">
                  
                    Nadpis
                  
                </label>

                <input
                    {...register('title', { required: true })}
                    className="w-full h-12 border border-neutral-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md bg-neutral-50"
                    placeholder="Zadejte nadpis..."
                />
                {/* vypis chyby  */}
                {errors.title && (
                    <span className="text-red-500 text-sm">Toto pole je povinné.</span>
                )}
            </div>

            <div>
                <label className="block text-md font-medium text-gray-700 mb-1">

                    Text
              
                </label>
                <textarea
                    {...register('body', { required: true })}
                    className="w-full sm:h-64 h-72 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md bg-neutral-50"
                    rows="4"
                    placeholder="Zadejte text příspěvku..."
                />
                {/* vypis chyby  */}
                {errors.body && (
                    <span className="text-red-500 text-sm">
                  
                        Toto pole je povinné.
                
                    </span>
                )}
            </div>

            <button
                type="submit"
                className="w-28 mx-auto bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
            >
                {/* tlacicko pro ulozeni, kdyz post existuje. Jinak -> pro vytvoreni */}
                {post ? 'Uložit' : 'Vytvořit'}
            </button>

        </form>
    );
}

export default PostForm;

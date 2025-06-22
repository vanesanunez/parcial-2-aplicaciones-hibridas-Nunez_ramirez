import { useEffect,useState} from "react";


function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])  //el hook trae un delay, esperar un tiempo para actualizar el value. El clear time out limpia el timeout para reiniciar. El prceso sigue hasta que el usuario termina de escribir
    //para no hacer muchas peticiones es esto
    return debouncedValue
}

export default useDebounce;
    // funcion para ir pasando 1 a 1 los elementos de un array.
    const textoBienvenida = ["Bienvenido", "Welcome", "ようこそ", "Benveuto", "환영", "Bem-vindo", "受欢迎", "Willkommen", "Bienvenu", "مَرْحَباً", "добро пожаловать"]
    const [ textoIndex, setTextoIndex ] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTextoIndex((prevIndex) => (prevIndex + 1) % textoBienvenida.length);
        }, 2000);
        return () => clearInterval(intervalId);
    }, [textoBienvenida])


    //*Html de funcion

{/* <h1 className={styles.changinTitle}>{textoBienvenida[textoIndex]}</h1> */}

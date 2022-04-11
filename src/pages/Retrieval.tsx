import styles from "../styles/Retrieval.module.css";
import Cat from "../assets/cat.jpeg";

const Retreival = () => {
    return (
        <div className={styles.main}>
            <h1>
                Currently there is no way for you to create a new password. Talk to Alec.
                He'll probably help you depending on the mood he's in. Here is a picture of a cat:
            </h1>
            <img src={Cat} alt="cat not found"/>
        </div>
    )
}

export default Retreival;


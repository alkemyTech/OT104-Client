import Loader from "react-loader-spinner";

const Spinner = () => {
    return(
        <div 
            className="d-flex justify-content-center align-items-center"
            style={{height:"40em"}}
        >
            <Loader
                style={{height:"fit-content"}}
                type="Grid"
                color="#DB5752"
                height={100}
                width={100}
            />
        </div>
    )
}

export default Spinner


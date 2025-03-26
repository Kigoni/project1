import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";

const Journalspage = () => {
    return (
        <div>
            <Navbar2 />
            <div className="mt-16">
                <iframe
                    style={{ border: "1px #FFFFFF none" }}
                    src="https://afrikajournals.netlify.app/"
                    title="iFrame"
                    width="100%"
                    height="2600px"
                    scrolling="no"
                    frameBorder="no"
                    allow="fullscreen"
                />
            </div>
            <Footer />
        </div>
    );
};

export default Journalspage;

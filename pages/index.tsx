import Header from "../components/Header/Header";
import styles from "./styles.module.scss";
import FirstWidget from "../components/FirstWidget/FirstWidget";
import About from "../components/About/About";
import Projects from "../components/Projects/Projects";
import Blog from "../components/Blog/Blog";
import Footer from "../components/Footer/Footer";
import Auditory from "../components/Auditory/Auditory";

export default function (props) {
  return (
    <div className={styles.parent}>
      <Header />
      <FirstWidget name={"widget0"} />
      <About name={"widget1"} />
      <Auditory name={"widget2"} />
      {/*<Projects name={"widget3"} />*/}
      {/*<Blog name={"widget4"} />*/}
      <Footer />
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {},
  };
}

import styles from './CreateArticle.module.scss'


import dynamic from 'next/dynamic'
import Input from "../Input/Input";
import Button from "../Button/Button";
import AdminCardParent from "../AdminCardParent/AdminCardParent";

const DynamicComponentWithNoSSR = dynamic(
  () => import('../Editor/Editor'),
  { ssr: false }
)

export default function CreateArticle(){

  return(
    <div>
      <AdminCardParent>
        <div className={styles.parent}>
          <div className={styles.content}>
            <div className={styles.inputParent}>
              <div style={{width:"100%", maxWidth:"750px"}}>
                <Input placeholder={"Название статьи"}/>
              </div>
            </div>
            <DynamicComponentWithNoSSR/>
            <Button>Опубликовать</Button>
          </div>
        </div>
      </AdminCardParent>
    </div>
  )
}

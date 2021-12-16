import React from 'react'
import styles from './loading.module.css'
import { I18n } from 'react-redux-i18n';

const Loading = ({ isLoading = false, children }) => {

    return (
        <>
            {isLoading ? (
                <div className={styles.spinner}>
                    <div className={styles.loader}>{I18n.t('Loading')}...</div>
                </div>
            )
                : (children)
            }
        </>
    )
}

export default Loading
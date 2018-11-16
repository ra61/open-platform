
import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import styles from './index.less';


const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class UploaderImage extends Component {

    constructor(props) {
        super(props);
    }

    state = {};

    handleChange = (info) => {

        const { onChange } = this.props;
        
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                this.setState({ imageUrl });
            });
        }

        if (info.file.response && info.file.response.status == 'ok'){
            onChange(info.file.response.url);
        }
    }

    render() {
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                className={styles.avatarUploader}
                name="avatar"
                showUploadList={false}
                action="/api2/dev/application/uploadImage"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {
                    imageUrl ?
                        <img src={imageUrl} alt="" className={styles.avatar} /> :
                        <Icon type="plus" className={styles.avatarUploaderTrigger} />
                }
            </Upload>
        );
    }
}


export default UploaderImage;

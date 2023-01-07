import React from 'react';
import FileUploaderPresentationalComponent from './FileUploaderPresentationalComponent'
import SelectIcon from '@material-ui/icons/InsertDriveFile';
import UploadIcon from '@material-ui/icons/Publish';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

//https://spin.atomicobject.com/2018/09/13/file-uploader-react-typescript/

interface Props {
  message: string;
}

interface State {
  dragging: boolean,
  file: File | null,
  uploadProgress: {},
  successfullUploaded: boolean,
  uploading: false
};


class FileUploader extends React.Component<Props, State> {
  static counter = 0;
  fileUploaderInput: HTMLElement | null = null;

  private uploadurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/media" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/media/"

  constructor(props: Props) {
    super(props);

    this.state = {
      dragging: false, file: null,
      uploadProgress: {},
      successfullUploaded: false,
      uploading: false
    };
  }

  dragEventCounter = 0;
  dragenterListener = (event: React.DragEvent<HTMLDivElement>) => {
    this.overrideEventDefaults(event);
    this.dragEventCounter++;
    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      this.setState({ dragging: true });
    } else if (
      event.dataTransfer.types &&
      event.dataTransfer.types[0] === "Files"
    ) {
      // This block handles support for IE - if you're not worried about
      // that, you can omit this

      this.setState({ dragging: true });
    }
  };

  dragleaveListener = (event: React.DragEvent<HTMLDivElement>) => {
    this.overrideEventDefaults(event);
    this.dragEventCounter--;

    if (this.dragEventCounter === 0) {
      this.setState({ dragging: false });
    }
  };

  dropListener = (event: React.DragEvent<HTMLDivElement>) => {
    this.overrideEventDefaults(event);
    this.dragEventCounter = 0;
    this.setState({ dragging: false });

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      this.setState({ file: event.dataTransfer.files[0] });
    }
  };

  overrideEventDefaults = (event: Event | React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  onSelectFileClick = () => {
    this.fileUploaderInput && this.fileUploaderInput.click();
  };

  onFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ file: event.target.files[0] });
    }
    console.log(this.state.file);
  };

  componentDidMount() {
    window.addEventListener("dragover", (event: Event) => {
      this.overrideEventDefaults(event);
    });
    window.addEventListener("drop", (event: Event) => {
      this.overrideEventDefaults(event);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("dragover", this.overrideEventDefaults);
    window.removeEventListener("drop", this.overrideEventDefaults);
  }

  async uploadFiles() {
    console.log("uploadFiles")
    //var promises: [] = [];
    this.sendRequest(this.state.file)
      .then((data) => {
        this.setState({ successfullUploaded: true, uploading: false });
        console.log("success " + data)
      })
      .catch((err) => {
        console.log(err)
        this.setState({ successfullUploaded: false, uploading: false });
      })
    /*
    try {
      await Promise.all(promises);
      this.setState({ successfullUploaded: true, uploading: false });
      console.log("success")
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      console.log(e)
      this.setState({ successfullUploaded: false, uploading: false });
    }
    */
  }

  async sendRequest(file: File | null) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          var copy = { ...this.state.uploadProgress };
          copy = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        var copy = { ...this.state.uploadProgress };
        copy = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener('error', event => {
        var copy = { ...this.state.uploadProgress };
        copy = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        console.log(event)
        reject(req.response);
      });

      req.addEventListener("error", event => {
        console.log(event)
        reject(req.response);
      });

      req.addEventListener('abort', event => {
        console.log(event)
        reject(req.response);
      });

      req.addEventListener('fetch', event => {
        console.log(event)
        reject(req.response);
      });

      const formData = new FormData();
      if (file !== null) {
        console.log("upload to " + this.uploadurl)
        console.log(file.name)
        formData.append("file", file);
        req.open("POST", this.uploadurl);
        req.send(formData)
      } else {
        console.log("null - no upload")
      }

    });
  }


  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} >
          <FileUploaderPresentationalComponent
            dragging={this.state.dragging}
            file={this.state.file}
            onSelectFileClick={this.onSelectFileClick}
            onDrag={this.overrideEventDefaults}
            onDragStart={this.overrideEventDefaults}
            onDragEnd={this.overrideEventDefaults}
            onDragOver={this.overrideEventDefaults}
            onDragEnter={this.dragenterListener}
            onDragLeave={this.dragleaveListener}
            onDrop={this.dropListener}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button fullWidth
            variant="contained"
            component="label"
          >
            Select
            <SelectIcon />
            <input
              ref={el => (this.fileUploaderInput = el)}
              type="file"
              className="file-uploader__input"
              onChange={this.onFileChanged}
              hidden
            />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button variant="contained" color="default" fullWidth onClick={(event: any) => {
            this.uploadFiles()
          }}>
            Upload it
            <UploadIcon />
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default FileUploader
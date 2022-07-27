import React, { useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import './DragAndDrop.css'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function DragAndDrop({ setFile, file }) {

    const updateFile = (acceptedFiles) => {
        setFile(acceptedFiles[0])
    }

    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        fileRejections,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        // props go here
        accept: {
            "image/*": []
        },
        maxFiles: 1,
        onDropAccepted: updateFile
    });

    // const style = useMemo(() => ({
    //     ...baseStyle,
    //     ...DragAndDrop(isFocused ? focusedStyle : {}),
    //     ...DragAndDrop(isDragAccept ? acceptStyle : {}),
    //     ...DragAndDrop(isDragReject ? rejectStyle : {})
    // }), [isFocused, isDragAccept, isDragReject])

    const acceptedFileItems = acceptedFiles.map(file => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        )
    });

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    // const thumbs = files.map(file => (
    //     <div style={thumb} key={file.name}>
    //         <div style={thumbInner}>
    //             <img
    //                 src={file.preview}
    //                 style={img}
    //                 // Revoke data uri after image is loaded
    //                 onLoad={() => { URL.revokeObjectURL(file.preview) }}
    //             />
    //         </div>
    //     </div>
    // ));

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p id="dnd-text">Drag 'n' drop a file here, or click to select one</p>
            </div>
            <div>
                {acceptedFileItems.length > 0 &&
                    <>
                        <div id="accepted-file-container">
                            <div id="accepted-file-left">
                                <div>Accepted file:</div>
                                <ul>{acceptedFileItems}</ul>
                            </div>
                            <img
                                id="dnd-preview"
                                src={file.path ? URL.createObjectURL(file) : ""}
                                alt=""
                            />
                        </div>
                    </>
                }
                {fileRejectionItems.length > 0 &&
                    <>
                        <div>Rejected file:</div>
                        <ul>{fileRejectionItems}</ul>
                    </>
                }
            </div>
        </section>
    )
}

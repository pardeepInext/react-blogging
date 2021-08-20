import React, { useEffect, useRef } from 'react'
import Quill from 'quill';
const Add = () => {
    const editor = useRef(null)
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            let quill = new Quill('#editor', {
                theme: 'snow'
            })
        }
        return () => mounted = false;
    }, []);


    return (
        <>
            <div>
                <div ref={editor} id="editor"></div>
            </div>
        </>
    )
}

export default Add

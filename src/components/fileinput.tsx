import React from "react";


interface FileInputProps
{
    onFileChange: (file: File | null) => void;
}

const MyFileInput: React.FC<FileInputProps> = ({ onFileChange }) =>
{
    const handleFileButtonClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    {
        e.preventDefault()
        onFileChange(null)
        const fileInput = document.getElementById('fileInput') as HTMLInputElement
        fileInput.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const file = e.target.files ? e.target.files[0] : null
        onFileChange(file);
    }

    return (
        <div className="file-input-container">
            <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button className="my_button" onClick={handleFileButtonClick}>
                Choose File
            </button>
        </div>
    );
};

export {MyFileInput}
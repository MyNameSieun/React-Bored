import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CustomToolbar } from 'styles/CustomToolbar';

const TextEditor = ({ value, onChange }) => {
  // 툴바 설정
  const modules = {
    toolbar: {
      container: '#toolbar' // CustomToolbar의 id
    }
  };

  // 포맷 설정
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'color',
    'background'
  ];

  return (
    <div>
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={onChange}
        style={{ height: '70vh' }}
      />
    </div>
  );
};

export default TextEditor;

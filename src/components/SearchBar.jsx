export default function SearchBar() {
  return (
    <>
      <style>{`
        .search-container{
          margin-top:40px;
        }

        .search-input{
          width:100%;
          background:#1f1f1f;
          border:1px solid #2a2a2a;
          border-radius:20px;
          padding:16px 20px;
          color:white;
          font-size:16px;
          outline:none;
          transition:.3s;
          box-sizing:border-box;
        }

        .search-input::placeholder{
          color:#8a8a8a;
        }

        .search-input:focus{
          border-color:#9b6a45;
          box-shadow:0 0 0 3px rgba(155,106,69,.15);
        }
      `}</style>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search coffee menu..."
          className="search-input"
        />
      </div>
    </>
  );
}
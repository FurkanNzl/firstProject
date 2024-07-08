import React from "react";

function Error({ statusCode }) {
    console.log(statusCode)
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>
        {statusCode ? `Bir hata oluştu: ${statusCode}` : "Bir hata oluştu"}
      </h1>
      <p>
        {statusCode === 404
          ? "Aradığınız sayfa bulunamadı."
          : "Sunucuda bir hata meydana geldi. Lütfen daha sonra tekrar deneyin."}
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
    console.log(res)
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

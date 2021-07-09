import Swal from "sweetalert2";
import { useHistory } from "react-router";

const Logout = () => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();

    let timerInterval;
    Swal.fire({
      title: "Logout!",
      html: "I will close in <b></b> milliseconds.",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    history.push("/");
    history.go(0);
  };

  return <>{logout()}</>;
};

export default Logout;

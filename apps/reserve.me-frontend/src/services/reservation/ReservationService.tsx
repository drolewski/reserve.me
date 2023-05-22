export const getCompanyReservation = (companyName: string) => {
  return fetch(`http://localhost:8080/reservation/${companyName}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

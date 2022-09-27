interface Transporter {
    send(mailOptions: any): Promise<any>
}

export default Transporter

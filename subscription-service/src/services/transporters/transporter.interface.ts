export interface Transporter {
    send(mailOptions: any): Promise<any>
}
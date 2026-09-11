import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../scss/main.scss';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

const btnScanQr = document.getElementById('btn-scan-qr');
const scanResultContainer = document.getElementById('scan-result-container');

btnScanQr.addEventListener('click', async () => {
    try {
        const result = await CapacitorBarcodeScanner.scanBarcode({
            hint: CapacitorBarcodeScannerTypeHint.QR_CODE
        });

        if (result.ScanResult) {
            scanResultContainer.innerText = "Conteúdo lido: " + result.ScanResult;
        } else {
            scanResultContainer.innerText = "Leitura sem conteúdo detectado.";
        }
    } catch (scanError) {
        console.error(scanError);
        scanResultContainer.innerText = "Falha ao iniciar o leitor de QR Code.";
    }
});
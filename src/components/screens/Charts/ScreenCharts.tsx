import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

export const optionsBar = {
  title: "Cantidad de Pedidos Por Fecha",
  legend: { position: "bottom" },
};

export const optionsPie = {
  title: "Cantidad de Pedidos Por Instrumento",
  legend: { position: "bottom" },
};

export const ScreenCharts = () => {
  
  const [datosChartBar, setDatosChartBar] = useState<any>();
  const [datosChartPie, setDatosChartPie] = useState<any>();


  const getDatosChartPieFetch = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/pedidos/all');
      const data = await response.json();
  
      // Agrupar los pedidos por instrumento
      const groupedData = data.reduce((acc:any, pedido:any) => {
        pedido.pedidosDetalle.forEach((detalle:any) => {
          const instrumento = detalle.instrumento.instrumento;
          if (!acc[instrumento]) {
            acc[instrumento] = 0;
          }
          acc[instrumento]++;
        });
        return acc;
      }, {});
  
      // Convertir los datos agrupados en el formato requerido por React-Google-Charts
      const chartData = [['Instrumento', 'Cantidad de Pedidos']];
      for (const key in groupedData) {
        chartData.push([key, groupedData[key]]);
      }
      setDatosChartPie(chartData);
      return chartData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }


  const getDatosChartBarFetch = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/pedidos/all');
      const data = await response.json();
  
      // Agrupar los pedidos por mes y año
      const groupedData = data.reduce((acc:any, pedido:any) => {
        const fechaPedido = new Date(pedido.fechaPedido);
        const year = fechaPedido.getFullYear();
        const month = fechaPedido.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
  
        const key = `${year}-${month}`;
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key]++;
  
        return acc;
      }, {});
  
      // Convertir los datos agrupados en el formato requerido por React-Google-Charts
      const chartData = [['Mes y Año', 'Cantidad de Pedidos']];
      for (const key in groupedData) {
        chartData.push([key, groupedData[key]]);
      }
      setDatosChartBar(chartData);
      return chartData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  useEffect(() => {
    getDatosChartBarFetch();
    getDatosChartPieFetch();
  }, []);

  return (
    <>
      <Chart
        chartType="BarChart"
        data={datosChartBar}
        options={optionsBar}
        width="100%"
        height="400px"
      />
      <Chart
        chartType="PieChart"
        data={datosChartPie}
        options={optionsPie}
        width="100%"
        height="400px"
      />
    </>
  )
}

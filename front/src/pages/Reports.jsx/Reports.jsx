import React, { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Card from "../../components/Card";
import Button from "../../components/Button";
import './Reports.scss';

const Reports = () => {
  const navigate = useNavigate();
  const [allReports, setAllReports] = useState([]);
  const [reports, setReports] = useState([]);
  const [reportName, setReportName] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportLocation, setReportLocation] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debouncedSearch = useDebounce(search, 1000);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
 

  // Traer todos los reportes (no requiere token de autenticación)
  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:3002/reports");
      setAllReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Mostrar los reportes de la página actual
  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    setReports(allReports.slice(start, end));
  }, [page, limit, allReports]);

  // Fetch inicial
  useEffect(() => {
    fetchReports();
  }, []);

  // Crear nuevo reporte
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReport = {
      title: reportName,
      description: reportDescription,
      location: reportLocation,
      tags: ["general"],
      locationPoint: [],
    };

    try {
      const token = Cookies.get("jwtoken");
      if (!token) {
        return console.error("No hay token. Por favor inicia sesión.");
      }

      await axios.post("http://localhost:3002/reports", newReport, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReportName("");
      setReportDescription("");
      setReportLocation("");
      fetchReports();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const res = await axios.get("http://localhost:3002/reports/search", {
        params: { title: searchTerm },
      });
      setAllReports(res.data);
      setPage(1);
      setSuggestions([]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (debouncedSearch) {
      fetchSuggestions(debouncedSearch);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  const fetchSuggestions = async (searchTerm) => {
    try {
      const res = await axios.get("http://localhost:3002/reports/search", {
        params: { title: searchTerm },
      });
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    
 <div className="reports-page">
    <div className="home-container">
   
    <div className="report-title"><h2>Reportes</h2></div>
      
      {reports.length === 0 && <p>No hay reportes aún.</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={reportName}
          onChange={(e) => setReportName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={reportDescription}
          onChange={(e) => setReportDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={reportLocation}
          onChange={(e) => setReportLocation(e.target.value)}
        />

        <Button type="submit" className="btn-primary">
          Agregar reporte
        </Button>
      </form>

      {/* Form search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(search);
        }}
      >
        <input
          type="text"
          placeholder="buscar por nombre"
          value={search}
          onChange={handleSearchChange}
        />
        <Button type="submit" className="btn-primary">
          Buscar
        </Button>
        {suggestions.length > 0 && (
          <ul className="autocomplete-suggestions">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion._id}
                onClick={() => {
                  setSearch(suggestion.title);
                  handleSearch(suggestion.title);
                  setSuggestions([]);
                }}
                style={{ cursor: "pointer" }}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}
        
      </form>

      <div className="card-grid">
        {reports.map((report) => (
          <Card
            key={report._id}
            title={report.title}
            description={report.description}
            location={report.location}
            date={report.createdAt}
            tags={report.tags}
          >
            <Button onClick={() => navigate(`/reports/${report._id}`)}>
              Ver Detalles
            </Button>
          </Card>
        ))}
      </div>
      <div className="reports-select">
        <p>Mostrando resultados por página:</p>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={3}>3</option>
          <option value={6}>6 por página</option>
          <option value={9}>9 por página</option>
        </select>
      </div>

     
      <div className="pagination-controls">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Anterior
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page * limit >= allReports.length}
        >
          Siguiente
        </Button>
        
      </div>
      
    </div>
 
    </div>
    
  );
  
};

export default Reports;



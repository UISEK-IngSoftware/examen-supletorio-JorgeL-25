import React, { useEffect, useMemo, useState } from "react";
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import type { Character } from "../models/character.model";
import { characterService } from "../services/character.service";

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const sortedCharacters = useMemo(() => {
    return [...characters].sort((a, b) => a.name.localeCompare(b.name));
  }, [characters]);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await characterService.getCharacters(1);
      setCharacters(data);
    } catch (err: any) {
      setError(err?.message || "Error al cargar personajes");
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>The Simpsons Characters</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading isOpen={loading} message="Cargando personajes..." />

        {error && (
          <IonText color="danger">
            <p style={{ padding: "16px" }}>{error}</p>
          </IonText>
        )}

        {!loading && !error && sortedCharacters.length === 0 && (
          <IonText>
            <p style={{ padding: "16px" }}>No hay personajes disponibles.</p>
          </IonText>
        )}

        <IonList>
          {sortedCharacters.map((character) => {
            const imageUrl = character.imageUrl || "";

            return (
              <IonCard key={character.id} style={{ margin: "12px" }}>
                <IonCardContent>
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <img
                        src={imageUrl}
                        alt={character.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://ionicframework.com/docs/img/demos/avatar.svg";
                        }}
                      />
                    </IonAvatar>

                    <IonLabel>
                      <h2 style={{ fontWeight: 700 }}>{character.name}</h2>

                      <p>
                        <strong>Ocupación:</strong> {character.occupation}
                      </p>

                      <p>
                        <strong>Estado:</strong> {character.status}
                      </p>

                      <p>
                        <strong>Edad:</strong> {character.age ?? "N/A"}
                      </p>
                    </IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
